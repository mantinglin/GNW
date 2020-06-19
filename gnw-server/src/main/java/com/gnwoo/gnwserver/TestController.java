package com.gnwoo.gnwserver;

import com.gnwoo.gnwserver.data.dto.UserDTO;
import com.gnwoo.gnwserver.data.repo.ContactRepo;
import com.gnwoo.gnwserver.data.repo.FriendRequestRepo;
import com.gnwoo.gnwserver.data.repo.UserRepo;
import com.gnwoo.gnwserver.data.table.Contact;
import com.gnwoo.gnwserver.data.table.FriendRequest;
import com.gnwoo.gnwserver.data.table.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
public class TestController {
    @Autowired
    private UserRepo userRepository;
    @Autowired
    private ContactRepo contactRepo;
    @Autowired
    private FriendRequestRepo friendRequestRepo;

    @PostMapping(path="/getContacts")
    public @ResponseBody List<UserDTO> getContacts(@RequestParam Long uuid) {
        List<Long> relations = contactRepo.findRelationsFor(uuid);
        List<UserDTO> rv = new LinkedList<>();
        userRepository.findAllById(relations).forEach(e -> {
            rv.add(new UserDTO(e.getUsername(), e.getDisplayName()));
        });
        return rv;
    }

    @PostMapping(path="/addFriend")
    public @ResponseBody String addFriend (@RequestParam Long uuid,
                                           @RequestParam Long friendUUID) {
        if (!uuid.equals(friendUUID) && friendRequestRepo.findRequestFromTo(uuid, friendUUID).isEmpty()) {
            friendRequestRepo.save(new FriendRequest(uuid, friendUUID));
            return "TRUE";
        }
        return "FALSE";
    }

    @PostMapping(path="/getRequestsToMe")
    public @ResponseBody List<UserDTO> getRequestsToMe (@RequestParam Long uuid) {
        List<Long> requests = friendRequestRepo.findRequestTo(uuid);
        List<UserDTO> rv = new LinkedList<>();
        userRepository.findAllById(requests).forEach(e -> {
            rv.add(new UserDTO(e.getUsername(), e.getDisplayName()));
        });
        return rv;
    }

    @PostMapping(path="/getRequestsFromMe")
    public @ResponseBody List<UserDTO> getRequestsFromMe (@RequestParam Long uuid) {
        List<Long> requests = friendRequestRepo.findRequestFrom(uuid);
        List<UserDTO> rv = new LinkedList<>();
        userRepository.findAllById(requests).forEach(e -> {
            rv.add(new UserDTO(e.getUsername(), e.getDisplayName()));
        });
        return rv;
    }

    // example for auth right here
    @PostMapping(path="/acceptRequest")
    public @ResponseBody String getRequestsFromMe (@RequestParam Long uuid,
                                                   @RequestParam Long requesterUUID) {
        List<Long> requests = friendRequestRepo.findRequestFromTo(requesterUUID, uuid);
        if (!requests.isEmpty()) {
            friendRequestRepo.deleteById(requests.get(0));
            contactRepo.save(new Contact(requesterUUID, uuid));
            return "TRUE";
        }
        return "no such request";
    }

    @PostMapping(path="/unfriend")
    public @ResponseBody String unfriend (@RequestParam Long uuid,
                                          @RequestParam Long friendUUID) {
        List<Long> relations = contactRepo.findRelationBetween(uuid, friendUUID);
        if (!relations.isEmpty()) {
            contactRepo.deleteById(relations.get(0));
            return "TRUE";
        }
        return "FALSE";
    }

    @PostMapping(path="/addUser")
    public @ResponseBody String addUser (@RequestParam String username,
                                         @RequestParam String displayName,
                                         @RequestParam String email) {
        try {
            userRepository.save(new User(username, displayName, email));
            return "TRUE";
        } catch (Exception e) {
            System.out.println("catched");
            return "duplicated username";
        }
    }
}

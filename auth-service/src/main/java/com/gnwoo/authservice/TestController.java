package com.gnwoo.authservice;

import com.gnwoo.authservice.data.repo.AuthRepo;
import com.gnwoo.authservice.data.table.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
public class TestController {
    @Autowired
    private AuthRepo authRepo;

    // TODO: listen to RPC call from user service
    @GetMapping(path="/signup")
    public @ResponseBody ResponseEntity<String> echo() {
        // TODO: bcrypt user-input password and insert it into db
        Long uuid = Long.valueOf(123);
        String hashed_password = "123";
        authRepo.save(new Auth(uuid, hashed_password));
        return new ResponseEntity<>("Signed Up!", HttpStatus.OK);
    }

    // TODO: listen to RPC call from user service
    @PostMapping(path="/login")
    public @ResponseBody ResponseEntity<String> handleLogin(@RequestParam Long uuid,
                                                            @RequestParam String user_input_password) {
        // get user's hashed_password from db
        List<String> relations = authRepo.findHashedPassword(uuid);

        // invalid login: username does not exist
        if(relations.isEmpty())
            return new ResponseEntity<>("user does not exit", HttpStatus.UNAUTHORIZED);

        // otherwise, username found
        String hashed_password = relations.get(0);

        // TODO: bcrypt the user-input password for comparison
        String user_input_hashed_password = "";

        // valid login: username and password combination matched
        if(user_input_password.equals(hashed_password))
        {
            // TODO: construct a JWT token
            String JWT_token = "JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
            String header_attribute = "Secure; HttpOnly";
            String header_value = JWT_token + header_attribute;

            // response OK with JWT in the header
            HttpHeaders headers = new HttpHeaders();
            headers.add("Set-Cookie", header_value);
            return new ResponseEntity<>("login success", headers, HttpStatus.OK);
        }
        // otherwise, invalid login
        return new ResponseEntity<>("invalid username or password", HttpStatus.UNAUTHORIZED);
    }
}

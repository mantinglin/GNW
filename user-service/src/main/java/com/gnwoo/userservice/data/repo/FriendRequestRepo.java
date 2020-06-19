package com.gnwoo.userservice.data.repo;

import com.gnwoo.userservice.data.table.FriendRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FriendRequestRepo extends CrudRepository<FriendRequest, Long> {
    @Query(value = "select id from friend_request where uuida=?1 and uuidb=?2", nativeQuery = true)
    List<Long> findRequestFromTo(Long uuid, Long friendUUID);

    @Query(value = "select uuidb from friend_request where uuida=?1", nativeQuery = true)
    List<Long> findRequestFrom(Long uuid);

    @Query(value = "select uuida from friend_request where uuidb=?1", nativeQuery = true)
    List<Long> findRequestTo(Long uuid);
}

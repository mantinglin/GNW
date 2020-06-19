package com.gnwoo.authservice.data.repo;

import com.gnwoo.authservice.data.table.Auth;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface AuthRepo extends CrudRepository<Auth, String>{
    @Query(value = "select hashed_password from auth where uuid=?1", nativeQuery = true)
    List<String> findHashedPassword(Long uuid);
}

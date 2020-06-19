package com.gnwoo.userservice.data.repo;

import com.gnwoo.userservice.data.table.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, Long> {

}

package com.gnwoo.gnwserver.data.repo;

import com.gnwoo.gnwserver.data.table.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, Long> {

}

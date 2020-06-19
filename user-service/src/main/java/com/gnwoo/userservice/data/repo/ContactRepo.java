package com.gnwoo.userservice.data.repo;

import com.gnwoo.userservice.data.table.Contact;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ContactRepo extends CrudRepository<Contact, Long> {
    @Query(value = "select uuida from contact where uuidb=?1 union all select uuidb from contact where uuida=?1", nativeQuery = true)
    List<Long> findRelationsFor(Long uuid);

    @Query(value = "select id from contact where (uuida=?1 and uuidb=?2) or (uuidb=?1 and uuida=?2)", nativeQuery = true)
    List<Long> findRelationBetween(Long uuid, Long friendUUID);
}

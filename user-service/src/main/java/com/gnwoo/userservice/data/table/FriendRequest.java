package com.gnwoo.userservice.data.table;

import javax.persistence.*;

@Entity
public class FriendRequest {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long uuidA;
    @Column(nullable = false)
    private Long uuidB;

    public FriendRequest() { }

    public FriendRequest(Long uuidA, Long uuidB) {
        this.uuidA = uuidA;
        this.uuidB = uuidB;
    }

    public Long getUuidA() {
        return uuidA;
    }

    public void setUuidA(Long uuidA) {
        this.uuidA = uuidA;
    }

    public Long getUuidB() {
        return uuidB;
    }

    public void setUuidB(Long uuidB) {
        this.uuidB = uuidB;
    }

    public Long getId() {
        return id;
    }
}

package com.gnwoo.authservice.data.table;

import javax.persistence.*;

@Entity
public class Auth {
    @Id
    private Long uuid;
    @Column(nullable = false)
    private String hashedPassword;

    public Auth() { }

    public Auth(Long uuid, String hashedPassword) {
        this.uuid = uuid;
        this.hashedPassword = hashedPassword;
    }

    public Long getUuid() {
        return uuid;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setUuid(Long uuid) {
        this.uuid = uuid;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }
}
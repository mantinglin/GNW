package com.gnwoo.userservice.data.table;

import javax.persistence.*;

@Entity
public class P2PChat {
    @Id
    private String chatID;
    @Column(nullable = false)
    private Long uuidA;
    @Column(nullable = false)
    private Long uuidB;

    public P2PChat() { }

    public P2PChat(String chatID, Long uuidA, Long uuidB) {
        this.chatID = chatID;
        this.uuidA = uuidA;
        this.uuidB = uuidB;
    }

    public String getChatID() {
        return chatID;
    }

    public void setChatID(String chatID) {
        this.chatID = chatID;
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
}

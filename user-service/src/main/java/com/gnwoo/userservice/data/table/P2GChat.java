package com.gnwoo.userservice.data.table;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class P2GChat {
    @Id
    private String chatID;
    @Column(nullable = false)
    private Long uuid;

    public P2GChat() { }

    public P2GChat(String chatID, Long uuid) {
        this.chatID = chatID;
        this.uuid = uuid;
    }

    public String getChatID() {
        return chatID;
    }

    public void setChatID(String chatID) {
        this.chatID = chatID;
    }

    public Long getUuid() {
        return uuid;
    }

    public void setUuid(Long uuid) {
        this.uuid = uuid;
    }
}

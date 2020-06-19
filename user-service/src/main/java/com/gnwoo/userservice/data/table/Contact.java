package com.gnwoo.userservice.data.table;

import javax.persistence.*;

@Entity
public class Contact {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long uuidA;
    @Column(nullable = false)
    private Long uuidB;

    public Contact() { }

    public Contact(Long uuidA, Long uuidB) {
        this.uuidA = uuidA;
        this.uuidB = uuidB;
    }

    public Long getId() {
        return id;
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

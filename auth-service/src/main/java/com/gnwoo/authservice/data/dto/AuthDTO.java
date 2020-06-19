package com.gnwoo.authservice.data.dto;

import com.gnwoo.authservice.data.table.Auth;

public class AuthDTO {
    private Long uuid;
    private String hashedPassword;

    public AuthDTO() { }

    public AuthDTO(Auth auth) {
        this.uuid = auth.getUuid();
        this.hashedPassword = auth.getHashedPassword();
    }
}

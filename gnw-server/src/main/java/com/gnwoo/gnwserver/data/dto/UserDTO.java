package com.gnwoo.gnwserver.data.dto;

public class UserDTO {
    private String username;
    private String display_name;

    public UserDTO() { }

    public UserDTO(String username, String display_name) {
        this.username = username;
        this.display_name = display_name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplay_name() {
        return display_name;
    }

    public void setDisplay_name(String display_name) {
        this.display_name = display_name;
    }
}

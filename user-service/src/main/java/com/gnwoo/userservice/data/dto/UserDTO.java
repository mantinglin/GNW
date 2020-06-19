package com.gnwoo.userservice.data.dto;

import com.gnwoo.userservice.data.table.User;

public class UserDTO {
    private String username;
    private String display_name;

    public UserDTO() { }

    public UserDTO(User user) {
        this.username = user.getUsername();
        this.display_name = user.getDisplayName();
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

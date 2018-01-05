package br.com.patagonia.discriminator.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class ExtendedUserDetails extends User {

    private String tenantId;

    public static final String DEFAULT_TENANT_ID = "public";

    public ExtendedUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities, String tenantId) {
        super(username, password, authorities);
        this.tenantId = tenantId;
    }

    public ExtendedUserDetails(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities, String tenantId) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.tenantId = tenantId;
    }

    public String getTenantId() {
        return (tenantId != null ? tenantId.toString() : DEFAULT_TENANT_ID);
    }
}

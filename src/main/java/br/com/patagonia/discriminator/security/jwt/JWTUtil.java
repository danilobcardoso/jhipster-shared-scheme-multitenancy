package br.com.patagonia.discriminator.security.jwt;

import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

public class JWTUtil {
    public static String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(JWTConfigurer.AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;


    }
}

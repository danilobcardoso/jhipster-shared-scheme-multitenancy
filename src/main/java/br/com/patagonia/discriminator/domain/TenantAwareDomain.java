package br.com.patagonia.discriminator.domain;


public interface TenantAwareDomain {
    public abstract String getTenantId();
    public abstract void setTenantId(String tenantId);
}

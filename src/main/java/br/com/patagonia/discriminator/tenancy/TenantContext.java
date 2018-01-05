package br.com.patagonia.discriminator.tenancy;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TenantContext {
    private static Logger logger = LoggerFactory.getLogger(TenantContext.class);

    private static  ThreadLocal<String> currentTenant = new ThreadLocal<>();

    public static void setCurrentTenant(String tenant) {
        logger.info("APP> Setting tenant to [" + tenant + "]");
        currentTenant.set(tenant);
    }

    public static String getCurrentTenant() {
        return currentTenant.get();
    }

    public static void clear() {
        logger.info("APP> Reseting tenant");
        currentTenant.set(null);
    }


}

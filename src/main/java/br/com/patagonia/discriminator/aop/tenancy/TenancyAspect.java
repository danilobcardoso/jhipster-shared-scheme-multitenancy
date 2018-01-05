package br.com.patagonia.discriminator.aop.tenancy;

import br.com.patagonia.discriminator.tenancy.TenantContext;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@Aspect
@Component
public class TenancyAspect {

    private static Logger logger = LoggerFactory.getLogger(TenancyAspect.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Before("execution(* br.com.patagonia.discriminator.service.CustomerService.*(..))")
    public void beforeExecution() throws Throwable {

        String tenantId = TenantContext.getCurrentTenant();
        logger.debug("Applying TENANCY filter");
        if (tenantId != null && !tenantId.isEmpty()) {

            Filter filter = entityManager.unwrap(Session.class).enableFilter("tenancyFilter");
            filter.setParameter("tenantId", tenantId);
            logger.warn("TENANCY filter set with value [" + tenantId + "]");
        }
        else
        {
            logger.warn("TENANCY filter NOT SET");
        }
    }
}

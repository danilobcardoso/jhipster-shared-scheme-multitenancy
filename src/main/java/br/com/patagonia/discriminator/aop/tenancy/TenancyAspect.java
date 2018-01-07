package br.com.patagonia.discriminator.aop.tenancy;

import br.com.patagonia.discriminator.domain.TenantAwareDomain;
import br.com.patagonia.discriminator.tenancy.TenantContext;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.PermissionDeniedDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
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

    @Before("execution(* br.com.patagonia.discriminator.service.*.*(..))")
    public void setTenancyFilter() throws Throwable {

        String tenantId = TenantContext.getCurrentTenant();
        logger.debug("Applying TENANCY filter");
        if (tenantId != null && !tenantId.isEmpty()) {
            Session session = entityManager.unwrap(Session.class);
            Filter filter = session.enableFilter("tenancyFilter");
            filter.setParameter("tenantId", tenantId);
            logger.debug("TENANCY filter set with value [" + tenantId + "]");
        }
        else
        {
            logger.debug("TENANCY filter NOT SET");
        }
    }

    @AfterReturning(pointcut="execution(* br.com.patagonia.discriminator.repository.*.findOne(..)) || " +
            " execution(* br.com.patagonia.discriminator.repository.*.getOne(..))", returning="value")
    public void validateTenantIdCheckingFindOne(Object value){
            checkObject(value);
    }

    @Before("execution(* br.com.patagonia.discriminator.repository.*.save(..)) || " +
        " execution(* br.com.patagonia.discriminator.repository.*.saveAndFlush(..))")
    public void setTenantIdBeforeSave(JoinPoint joinPoint){
        if (joinPoint.getArgs().length>0)
        {
            Object object = joinPoint.getArgs()[0];
            if (TenantAwareDomain.class.isInstance(object)) {
                TenantAwareDomain domain = (TenantAwareDomain) object;
                domain.setTenantId(TenantContext.getCurrentTenant());
            }
        }
    }

    @Before("execution(* br.com.patagonia.discriminator.repository.*.delete(..))")
    public void checkBeforeDelete(JoinPoint joinPoint){

        if (joinPoint.getArgs().length==0) return;
        if (JpaRepository.class.isInstance(joinPoint.getTarget()) == false) return;

        JpaRepository repository = (JpaRepository) joinPoint.getTarget();

        Object object = joinPoint.getArgs()[0];
        if (Long.class.isInstance(object))
        {
            object = repository.findOne((Long)object);
        }
        checkObject(object);
    }

    private void checkObject(Object object)
    {
        if (TenantAwareDomain.class.isInstance(object) == false) return;

        TenantAwareDomain domain = (TenantAwareDomain) object;
        if (domain.getTenantId().compareTo(TenantContext.getCurrentTenant())!=0)
        {
            logger.warn("Security issue. Someone is trying to delete an object he is not allowed to.");
            throw new PermissionDeniedDataAccessException("You are not allowed to perform this operation",null);
        }
    }
}

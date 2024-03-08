package com.valoriz.kiboconnector.utils;

import com.kibocommerce.sdk.common.ApiCredentials;
import com.kibocommerce.sdk.common.KiboConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KiboConfigurationUtils {

    @Value("${kibo.configuration.tenantId}")
    private Integer kiboTenantId;

    @Value("${kibo.configuration.siteId}")
    private Integer kiboSiteId;

    @Value("${kibo.configuration.clientId}")
    private String kiboClientId;

    @Value("${kibo.configuration.clientSecret}")
    private String kiboClientSecret;

    @Value("${kibo.configuration.tenantHost}")
    private String kiboTenantHost;

    @Value("${kibo.configuration.homeHost}")
    private String kiboHomeHost;

    public KiboConfiguration getKiboConfiguration() {
        // Configure the Kibo SDK with your Kibo Commerce tenant credentials
        return KiboConfiguration.builder()
                .withTenantId(kiboTenantId)
                .withSiteId(kiboSiteId)
                .withCredentials(
                        ApiCredentials.builder().setClientId(kiboClientId)
                                .setClientSecret(kiboClientSecret).build())
                .withTenantHost(kiboTenantHost)
                .withHomeHost(kiboHomeHost)
                .build();
    }
}

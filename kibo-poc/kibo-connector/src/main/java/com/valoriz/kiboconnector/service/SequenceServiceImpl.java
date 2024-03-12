/**
 * Copyright(c) 2024 Valoriz Digital Private Ltd.
 *
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Valoriz ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the contract agreement you entered into with Valoriz.
 *
 * @author Saajid
 */

package com.valoriz.kiboconnector.service;

import com.valoriz.kiboconnector.entity.Sequence;
import com.valoriz.kiboconnector.entity.SequenceConfiguration;
import com.valoriz.kiboconnector.repository.SequenceRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SequenceServiceImpl implements SequenceService {

    @Autowired
    private SequenceRepository sequenceRepository;

    private Random random = new Random();

    /**
     *
     * @param name
     * @return Generated sequence id.
     * @throws IllegalArgumentException
     *             if name is null.
     */
    @Override
    public String getNextSequenceId(String name) {
        if (StringUtils.isEmpty(name)) {
//            CommonLogger.error("23DC56EF-DFAB-42D5-B9FF-E6E478B2D5B9", "Name is mandatory to fetch sequence");
            throw new IllegalArgumentException("Mandatory: Please provide a valid name to fetch sequence.");
        }

        Sequence sequence = sequenceRepository.findByName(name);

        SequenceConfiguration config = sequence.getDefaultConfiguration();
        if (config == null) {
//            CommonLogger.warn("9BB5C8B2-5A66-4EAF-B969-9DB5E95BA27A", Constants.SEQUENCE_CONFIGURATION_NOT_FOUND, name,
//                    retailerId);
            return null;
        }
        String nextSequenceId = generateSequenceId(config);
        incrementSequence(sequence, config, 1);
        return nextSequenceId;
    }

    @Override
    public List<String> getNextSequenceIds(String name, int count) {
        List<String> nextSequenceIdList = new ArrayList<>();
        if (StringUtils.isEmpty(name)) {
            //            CommonLogger.error("23DC56EF-DFAB-42D5-B9FF-E6E478B2D5B9", "Name is mandatory to fetch sequence");
            throw new IllegalArgumentException("Mandatory: Please provide a valid name to fetch sequence.");
        }

        Sequence sequence = sequenceRepository.findByName(name);

        SequenceConfiguration config = sequence.getDefaultConfiguration();
        if (config == null) {
            //            CommonLogger.warn("9BB5C8B2-5A66-4EAF-B969-9DB5E95BA27A", Constants.SEQUENCE_CONFIGURATION_NOT_FOUND, name,
            //                    retailerId);
            return null;
        }
        for (int i = 0; i < count; i++) {
            String nextSequenceId = generateSequenceId(config);
            incrementSequence(sequence, config, 1);
            nextSequenceIdList.add(nextSequenceId);
        }
        return nextSequenceIdList;
    }

    /**
     *
     *
     * @param defaultConfiguration
     * @param name
     * @return
     */
    @Override
    public Sequence createDefaultSequenceConfig(SequenceConfiguration defaultConfiguration, String name) {
//        CommonLogger.debug("BF232AF7-A641-41A3-86B4-4390FB4B055A",
//                "defaultConfiguration to be updated for retailer:{} is :{}", retailerId, defaultConfiguration);

            Sequence sequence = new Sequence();
            sequence.setDefaultConfiguration(defaultConfiguration);
//            sequence.setRetailer(retailerId);
            sequence.setName(name);
            sequence.setEnabled(true);
//            sequence.setAppId(CommonConstants.AMBIENT_COM_APP_ID);
            return sequenceRepository.save(sequence);
    }

    /**
     *
     * @param name
     * @return
     */
    @Override
    public String getRandomNextSequence(String name) {
        if (StringUtils.isEmpty(name)) {
//            CommonLogger.error("6403DDFE-4500-4F6E-A1B9-8F077DBBEEFF", "Name is mandatory to fetch sequence");
            throw new IllegalArgumentException("Mandatory: Please provide a valid name to fetch sequence.");
        }

        Sequence sequence = sequenceRepository.findByName(name);
        SequenceConfiguration config = sequence.getDefaultConfiguration();
        if (config == null) {
//            CommonLogger.warn("5F094A63-BC62-42AB-A4DE-9BD495EB7FAC",
//                    "Sequence configuration not found for name {} and retailerId {}", name, retailerId);
            return null;
        }
        String nextSequenceId = generateSequenceId(config);
        int randomNumberMaxLimit = config.getRandomNumberMaxLimit();
        incrementSequence(sequence, config, Math.max(1, random.nextInt(randomNumberMaxLimit)));
        return nextSequenceId;
    }



    private void incrementSequence(Sequence sequence, SequenceConfiguration config, int delta) {
//        CommonLogger.debug("48F9F832-B4B7-40F7-AB0D-A5C36FF8AED7", "Updating sequence count");
        config.setNextValue(config.getNextValue() + delta);
        sequenceRepository.save(sequence);
    }

    private String generateSequenceId(SequenceConfiguration sequenceConfiguration) {
        if (sequenceConfiguration == null) {
            return null;
        }
        String prefix = sequenceConfiguration.getPrefix();
        String suffix = sequenceConfiguration.getSuffix();
        int minLength = sequenceConfiguration.getMinLength();
        char paddingCharacter = sequenceConfiguration.getPaddingCharacter();
        int nextValue = sequenceConfiguration.getNextValue();
        int sequenceLength = prefix.length() + String.valueOf(nextValue).length() + suffix.length();

        StringBuilder builder = new StringBuilder(prefix);
        for (int i = sequenceLength; i < minLength; i++) {
            builder.append(paddingCharacter);
        }
        return builder.append(sequenceConfiguration.getNextValue()).append(sequenceConfiguration.getSuffix())
                .toString();
    }

    /**
     *
     *
     * @param name
     * @return
     */
    @Override
    public SequenceConfiguration getSequenceConfigurationByName(String name) {
        if (StringUtils.isEmpty(name)) {
//            CommonLogger.error("23DC56EF-DFAB-42D5-B9FF-E6E478B2D5B9", "Name is mandatory to fetch sequence");
            throw new IllegalArgumentException("Mandatory: Please provide a valid name to fetch sequence.");
        }
        Sequence sequence = sequenceRepository.findByName(name);
        SequenceConfiguration config = sequence.getDefaultConfiguration();
        if (config == null) {
//            CommonLogger.warn("9BB5C8B2-5A66-4EAF-B969-9DB5E95BA27A", Constants.SEQUENCE_CONFIGURATION_NOT_FOUND, name);
            return null;
        }
        return config;
    }
}

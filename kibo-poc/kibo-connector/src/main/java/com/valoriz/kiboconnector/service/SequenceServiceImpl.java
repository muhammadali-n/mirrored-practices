/**
 * Copyright(c) 2024 Valoriz Digital Private Ltd.
 * <p>
 * All rights reserved.
 * <p>
 * This software is the confidential and proprietary information of Valoriz ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the contract agreement you entered into with Valoriz.
 *
 * @author Saajid
 */

package com.valoriz.kiboconnector.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.logging.Logger;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.valoriz.kiboconnector.entity.Sequence;
import com.valoriz.kiboconnector.entity.SequenceConfiguration;
import com.valoriz.kiboconnector.repository.SequenceRepository;

@Service
public class SequenceServiceImpl implements SequenceService {

    Logger logger = Logger.getLogger(SequenceServiceImpl.class.getName());

    @Autowired
    private SequenceRepository sequenceRepository;

    private Random random = new Random();

    @Override
    public String getNextSequenceId(String name) {
        if (StringUtils.isEmpty(name)) {
            logger.severe("Name is mandatory to fetch sequence.");
            throw new IllegalArgumentException("Mandatory: Please provide a valid name to fetch sequence.");
        }
        Sequence sequence = sequenceRepository.findByName(name);
        SequenceConfiguration config = sequence.getDefaultConfiguration();
        if (config == null) {
            logger.severe("SequenceConfiguration not found");
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
            logger.severe("Name is mandatory to fetch sequence");
            throw new IllegalArgumentException("Mandatory: Please provide a valid name to fetch sequence.");
        }
        Sequence sequence = sequenceRepository.findByName(name);
        SequenceConfiguration config = sequence.getDefaultConfiguration();
        if (config == null) {
            logger.severe("SequenceConfiguration not found");
            return null;
        }
        for (int i = 0; i < count; i++) {
            String nextSequenceId = generateSequenceId(config);
            incrementSequence(sequence, config, 1);
            nextSequenceIdList.add(nextSequenceId);
        }
        return nextSequenceIdList;
    }

    @Override
    public Sequence createDefaultSequenceConfig(SequenceConfiguration defaultConfiguration, String name) {
        logger.info("Request received to create default configuration for: " + name);
        Sequence sequence = new Sequence();
        sequence.setDefaultConfiguration(defaultConfiguration);
        sequence.setName(name);
        sequence.setEnabled(true);
        return sequenceRepository.save(sequence);
    }

    @Override
    public String getRandomNextSequence(String name) {
        if (StringUtils.isEmpty(name)) {
            logger.severe("Name is mandatory to fetch sequence.");
            throw new IllegalArgumentException("Mandatory: Please provide a valid name to fetch sequence.");
        }
        Sequence sequence = sequenceRepository.findByName(name);
        SequenceConfiguration config = sequence.getDefaultConfiguration();
        if (config == null) {
            logger.severe("SequenceConfiguration not found");
            return null;
        }
        String nextSequenceId = generateSequenceId(config);
        int randomNumberMaxLimit = config.getRandomNumberMaxLimit();
        incrementSequence(sequence, config, Math.max(1, random.nextInt(randomNumberMaxLimit)));
        return nextSequenceId;
    }

    private void incrementSequence(Sequence sequence, SequenceConfiguration config, int delta) {
        logger.info("Updating sequence count");
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
        return builder
                .append(sequenceConfiguration.getNextValue())
                .append(sequenceConfiguration.getSuffix())
                .toString();
    }

    @Override
    public SequenceConfiguration getSequenceConfigurationByName(String name) {
        if (StringUtils.isEmpty(name)) {
            logger.severe("Name is mandatory to fetch sequence.");
            throw new IllegalArgumentException("Mandatory: Please provide a valid name to fetch sequence.");
        }
        Sequence sequence = sequenceRepository.findByName(name);
        SequenceConfiguration config = sequence.getDefaultConfiguration();
        if (config == null) {
            logger.severe("SequenceConfiguration not found");
            return null;
        }
        return config;
    }
}

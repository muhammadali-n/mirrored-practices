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

import java.util.List;

public interface SequenceService {

    String getNextSequenceId(String name);

    List<String> getNextSequenceIds(String name, int count);

    String getRandomNextSequence(String name);

    Sequence createDefaultSequenceConfig(SequenceConfiguration defaultConfiguration, String name);

    SequenceConfiguration getSequenceConfigurationByName(String name);
}

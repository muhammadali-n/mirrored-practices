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

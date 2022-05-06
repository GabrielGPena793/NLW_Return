import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';


import { FeedbackType } from '../Widget';
import { ScreenShotButton } from '../ScreenShotButton';
import { Button } from '../Button';

import { theme } from '../../theme';
import { styles } from './styles';
import { feedbackTypes } from "../../utils/feedbackTypes";
import { api } from "../../libs/api"

interface Props {
  feedbackType: FeedbackType;
  onRequestReturn: () => void;
  onFeedbackSend: () => void;
}

export function Form({ feedbackType, onRequestReturn, onFeedbackSend }: Props) {

  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('')

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  function handleScreenShot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error));
  }

  function handleScreenShotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if(isSendingFeedback){
      return;
    }

    setIsSendingFeedback(true);
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64'});

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      });

      onFeedbackSend();

    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onRequestReturn}>
          <ArrowLeft
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenShotButton
          onTakeShot={handleScreenShot}
          onRemoveShot={handleScreenShotRemove}
          screenshot={screenshot}
        />

        <Button
          isLoading={isSendingFeedback}
          onPress={handleSendFeedback}
        />
      </View>
    </View>


  );
}
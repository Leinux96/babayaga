import React, { useEffect, useState } from 'react';
import { Text, type TextProps } from 'react-native';

interface TypewriterTextProps extends TextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export const TypewriterText = ({
  text,
  speed = 30,
  onComplete,
  style,
  ...props
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset if text changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <Text style={style} {...props}>
      {displayedText}
    </Text>
  );
};

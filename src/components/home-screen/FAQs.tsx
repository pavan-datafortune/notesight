import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Plus, Minus, ChevronUp, ChevronDown } from 'lucide-react-native';

const faqs = [
  {
    question:
      'How does NoteSight personalize test preparation material to help me increase my test scores?',
    answer:
      'NoteSight uses your feedback and performance data based on the study sessions to tailor your study and practice test material — helping you focus on the areas that matter most.',
  },
  {
    question:
      'How can NoteSight help my kids if they are already enrolled in a test center and/or seeing a private tutor?',
    answer:
      'Great questions! We are a great copilot tool for tutors and test centers. We are available 24 hours a day 7 days a week when students need answers and explanations to understand the content. We take the time to understand a student’s strengths and weaknesses, which test centers often miss or is not part of their program. We also encourage students to upload their own materials for personalized support—giving them more independence and reinforcing what they are expected to know on these standardized tests.',
  },
  {
    question: 'Is Notesight free to use?',
    answer:
      'Yes! We offer a free trial so you can explore NoteSight and see the results for yourself.',
  },
  {
    question: 'What standardized tests does NoteSight cover?',
    answer:
      'We currently support the PSAT and SAT, with more exams getting added every week.',
  },
  {
    question: 'Is NoteSight affordable and cheaper than using tutors?',
    answer:
      'Absolutely. NoteSight is on a monthly subscription and offers most tools unlimited. If you are only going to use NoteSight’s Standardized Test Planner to prepare for the big test then this is definitely a cost-effective solution. Our platform gives students access to high-quality support at a fraction of the cost.',
  },
  {
    question: 'Can I cancel the service?',
    answer:
      'Yes, NoteSight is billed monthly and can be canceled anytime. If you are not satisfied during any month, we will offer a full refund for that month. If you purchased a yearly subscription and have changed your mind or your requirements have changed, we will cancel your subscription and charge you as if you had a monthly subscription, canceling the month when the request is made.',
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [expanded, setExpanded] = useState(false);

  const dataToShow = expanded ? faqs : faqs.slice(0, 3);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>FAQs</Text>
      </View>

      <Text style={styles.heading}>
        Frequently asked <Text style={styles.highlighted}>questions</Text>
      </Text>

      {dataToShow.map((faq, index) => {
        const isActive = activeIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.card, isActive && styles.activeCard]}
            onPress={() => toggleAccordion(index)}
            activeOpacity={0.9}
          >
            <View style={styles.row}>
              <Text
                style={[styles.question, isActive && styles.activeQuestion]}
              >
                {faq.question}
              </Text>
              {isActive ? (
                <Minus size={20} color="#fff" />
              ) : (
                <Plus size={20} color="#000" />
              )}
            </View>
            {isActive && <Text style={styles.answer}>{faq.answer}</Text>}
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {expanded ? 'View Less' : 'View More'}
        </Text>
        {expanded ? (
          <ChevronUp size={16} color="indigo" />
        ) : (
          <ChevronDown size={16} color="indigo" />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tag: {
    backgroundColor: '#0066FF',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
    elevation: 2,
  },
  tagText: {
    color: '#fff',
    fontWeight: '600',
  },
  heading: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  highlighted: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  activeCard: {
    backgroundColor: '#0A0D1C',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 15,
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  activeQuestion: {
    color: '#fff',
    fontWeight: '600',
  },
  answer: {
    color: '#fff',
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#0A0D1C',
    paddingVertical: 14,
    borderRadius: 28,
    marginTop: 20,
    alignItems: 'center',
    width: 160,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

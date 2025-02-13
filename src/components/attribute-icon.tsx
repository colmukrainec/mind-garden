'use client'

import React from "react"
import {
  AlarmClockCheck,
  Angry,
  Annoyed,
  Armchair,
  BatteryCharging,
  Bed,
  Bird,
  BookCheck,
  BookOpenText,
  BookType,
  BriefcaseBusiness,
  BriefcaseMedical,
  Cake,
  CalendarHeart,
  Cigarette,
  ClockAlert,
  CloudFog,
  CloudRain,
  Cloudy,
  Coffee,
  Cookie,
  CookingPot,
  CupSoda,
  Drumstick,
  Dumbbell,
  EggFried,
  FerrisWheel,
  Film,
  Flower2,
  Footprints,
  Frown,
  Gamepad2,
  Gift,
  Guitar,
  HandCoins,
  Handshake,
  Headphones,
  Heart,
  HeartCrack,
  HeartHandshake,
  Hospital,
  House,
  HousePlus,
  Leaf,
  LucideIcon,
  MessageCircleOff,
  MessagesSquare,
  Milestone,
  NotebookPen,
  Palette,
  PartyPopper,
  Pill,
  Pizza,
  Plane,
  Rocket,
  School,
  Scissors,
  ShoppingBag,
  ShoppingBasket,
  Snowflake,
  Sun,
  ThermometerSun,
  Trophy,
  Tv,
  Users,
  Utensils,
  Weight,
  Wind,
  Wine,
  X
} from "lucide-react";

interface AttributeIconProps {
  category: string
  attribute: string
}

// TODO: Find suitable icons for the null valued attributes
const AttributeIcon: React.FC<AttributeIconProps> = ({
  category, attribute
}) => {
  const DEFAULT_ICON = X;
  const iconMap: Record<string, Record<string, LucideIcon | null>> = {
    'other': {
      'alcohol': Wine,
      'smoking': Cigarette,
      'coffee': Coffee,
      'snack': Cookie,
      'beverage': CupSoda,
    },
    'weather': {
      'sunny': Sun,
      'cloudy': Cloudy,
      'rainy': CloudRain,
      'snowy': Snowflake,
      'windy': Wind,
    },
    'school': {
      'class': School,
      'study': BookType,
      'homework': NotebookPen,
      'exam': BookCheck,
      'team project': MessagesSquare,
    },
    'emotions': {
      'excited': PartyPopper,
      'relaxed': Armchair,
      'proud': Trophy,
      'hopeful': Milestone,
      'happy': Flower2,
      'enthusiastic': Rocket,
      'content': Bird,
      'refreshed': BatteryCharging,
      'depressed': CloudFog,
      'lonely': Leaf,
      'anxious': null, // Could not find a suitable icon
      'sad': Frown,
      'angry': Angry,
      'pressured': Weight,
      'annoyed': Annoyed,
      'tired': Bed,
    },
    'hobbies': {
      'exercise': Dumbbell,
      'movie/TV': Tv,
      'gaming': Gamepad2,
      'reading': BookOpenText,
      'instrument': Guitar,
      'walk': Footprints,
      'music': Headphones,
      'art': Palette,
    },
    'meals': {
      'breakfast': EggFried,
      'lunch': Pizza,
      'dinner': Drumstick,
    },
    'beauty': {
      'hair': Scissors,
      'nails': null, // No suitable icon
      'skincare': null, // No suitable icon
      'makeup': null, // No suitable icon
    },
    'chores': {
      'cleaning': null, // No suitable icon
      'cooking': CookingPot,
      'laundry': null, // No suitable icon
      'dishes': null, // No suitable icon
    },
    'people': {
      'friends': Users,
      'family': HousePlus,
      'partner': Heart,
      'acquaintance': Handshake,
      'none': MessageCircleOff,
    },
    'work': {
      'end on time': AlarmClockCheck,
      'overtime': ClockAlert,
      'staff meal': HandCoins,
      'business trip': BriefcaseBusiness,
    },
    'relationship': {
      'date': HeartHandshake,
      'anniversary': CalendarHeart,
      'gift': Gift,
      'conflict': HeartCrack,
    },
    'health': {
      'sick': ThermometerSun,
      'hospital': Hospital,
      'checkup': BriefcaseMedical,
      'medicine': Pill,
    },
    'events': {
      'cinema': Film,
      'theme park': FerrisWheel,
      'shopping': ShoppingBag,
      'picnic': ShoppingBasket,
      'stay home': House,
      'party': Cake,
      'restaurant': Utensils,
      'travel': Plane,
    },
  }

  const IconComponent = iconMap[category]?.[attribute] ?? DEFAULT_ICON

  return <IconComponent className='w-5 h-5 inline-block mr-1'/>
}

export default AttributeIcon
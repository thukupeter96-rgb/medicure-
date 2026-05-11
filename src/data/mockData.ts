export interface Symptom {
  id: string;
  name: string;
  bodyPart?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  warnings: string[];
  type: 'Tablet' | 'Capsule' | 'Liquid' | 'Injection';
  schedule?: 'morning' | 'evening' | 'both';
  imageUrl?: string;
}

export interface Hospital {
  id: string;
  name: string;
  distance: string;
  specialty: string[];
  status: 'Open 24/7' | 'Closing Soon' | 'Emergency Only';
  rating: number;
  image: string;
  lat: number;
  lng: number;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
  description: string;
}

export const SYMPTOMS: Symptom[] = [
  { id: '1', name: 'Headache', bodyPart: 'head' },
  { id: '2', name: 'Fever' },
  { id: '3', name: 'Cough', bodyPart: 'chest' },
  { id: '4', name: 'Sore Throat', bodyPart: 'neck' },
  { id: '5', name: 'Shortness of Breath', bodyPart: 'chest' },
  { id: '6', name: 'Fatigue' },
  { id: '7', name: 'Muscle Aches' },
  { id: '8', name: 'Loss of Taste', bodyPart: 'head' },
  { id: '9', name: 'Nausea', bodyPart: 'stomach' },
  { id: '10', name: 'Dizziness', bodyPart: 'head' },
  { id: '11', name: 'Joint Pain', bodyPart: 'limbs' },
  { id: '12', name: 'Stomach Ache', bodyPart: 'stomach' },
];

export const MEDICATIONS: Medication[] = [
  {
    id: 'm1',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: '3 times daily',
    instructions: 'Take with food and a full glass of water. Finish the entire course.',
    warnings: ['May cause drowsiness', 'Avoid alcohol', 'Check for allergies'],
    type: 'Capsule',
    schedule: 'both',
  },
  {
    id: 'm2',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    instructions: 'Take at the same time every morning. Monitor blood pressure.',
    warnings: ['Dizziness when standing up', 'Dry cough', 'Avoid potassium supplements'],
    type: 'Tablet',
    schedule: 'morning',
  },
  {
    id: 'm3',
    name: 'Metformin',
    dosage: '850mg',
    frequency: 'Twice daily',
    instructions: 'Take with meals to reduce stomach upset.',
    warnings: ['Stay hydrated', 'Limit alcohol consumption'],
    type: 'Tablet',
    schedule: 'both',
  },
];

export const KENYAN_FOODS: FoodItem[] = [
  { id: 'f1', name: 'Ugali', calories: 365, protein: '9g', carbs: '79g', fats: '1g', description: 'Maize meal staple' },
  { id: 'f2', name: 'Sukuma Wiki', calories: 49, protein: '3g', carbs: '9g', fats: '1g', description: 'Sautéed kale/collard greens' },
  { id: 'f3', name: 'Nyama Choma', calories: 250, protein: '25g', carbs: '0g', fats: '17g', description: 'Roasted goat or beef' },
  { id: 'f4', name: 'Githeri', calories: 150, protein: '6g', carbs: '28g', fats: '2g', description: 'Maize and beans stew' },
  { id: 'f5', name: 'Chapati', calories: 297, protein: '8g', carbs: '46g', fats: '9g', description: 'Leavened flatbread' },
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: "St. Mary's Medical Center",
    distance: '1.2 km',
    specialty: ['Emergency', 'Cardiology', 'Pediatrics'],
    status: 'Open 24/7',
    rating: 4.8,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/hospital-1-878079ca-1778535497171.webp',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 'h2',
    name: 'City General Hospital',
    distance: '3.5 km',
    specialty: ['Neurology', 'Orthopedics'],
    status: 'Open 24/7',
    rating: 4.5,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/hospital-2-f467cd8e-1778535497136.webp',
    lat: 40.7200,
    lng: -74.010,
  },
  {
    id: 'h3',
    name: 'Global Health Institute',
    distance: '5.8 km',
    specialty: ['Research', 'Special Surgery'],
    status: 'Closing Soon',
    rating: 4.9,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/hospital-3-0668f8a4-1778535497099.webp',
    lat: 40.7300,
    lng: -74.020,
  },
];
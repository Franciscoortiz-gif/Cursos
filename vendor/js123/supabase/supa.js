import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const url = "https://iyjcwqzzjdklbkqcuyjm.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amN3cXp6amRrbGJrcWN1eWptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzE4Nzc5NCwiZXhwIjoyMDYyNzYzNzk0fQ.c2mbzJ9HnHkvIqcMlyHGazDTHc-jDd4Vs4KeJRN7bm8";

export const supabase = createClient(url, key);
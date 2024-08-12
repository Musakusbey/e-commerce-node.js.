const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lmjaikdkfvvaoirrgtmj.supabase.co'; // Fazladan boşluk kaldırıldı
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtamFpa2RrZnZ2YW9pcnJndG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNTI2NDMsImV4cCI6MjAzNzgyODY0M30.KJRZKX9_9IkblrZByNZejRam76jUX4CCDP0l2Y9YAHc';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

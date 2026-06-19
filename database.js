const SUPABASE_URL =
    "https://ehmgaogayouxluzdloeh.supabase.co";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVobWdhb2dheW91eGx1emRsb2VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDU5MDEsImV4cCI6MjA5NjUyMTkwMX0.tKifUJ5Gw9CdRKUCZNVpFrQveb6ms4MkwQ6DrqJ8fcM";

window.supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );
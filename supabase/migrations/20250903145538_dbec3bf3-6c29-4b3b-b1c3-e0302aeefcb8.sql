-- Create vivian_chats table for storing chat sessions
CREATE TABLE IF NOT EXISTS public.vivian_chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  messages JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vivian_chats ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access (for vivian chat)
CREATE POLICY "Allow public access to vivian_chats" 
ON public.vivian_chats 
FOR ALL 
USING (true)
WITH CHECK (true);
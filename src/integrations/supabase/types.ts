export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      chat_conversations: {
        Row: {
          concierge: string
          created_at: string
          group_description: string | null
          group_name: string | null
          id: string
          is_group: boolean | null
          max_participants: number | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          concierge: string
          created_at?: string
          group_description?: string | null
          group_name?: string | null
          id?: string
          is_group?: boolean | null
          max_participants?: number | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          concierge?: string
          created_at?: string
          group_description?: string | null
          group_name?: string | null
          id?: string
          is_group?: boolean | null
          max_participants?: number | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          delivery_status: string | null
          edited_at: string | null
          encrypted_content: string | null
          file_size: number | null
          id: string
          image_url: string | null
          is_encrypted: boolean | null
          mime_type: string | null
          page_context: string | null
          recipient_id: string | null
          reply_to_id: string | null
          role: string
          search_vector: unknown
          video_url: string | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          delivery_status?: string | null
          edited_at?: string | null
          encrypted_content?: string | null
          file_size?: number | null
          id?: string
          image_url?: string | null
          is_encrypted?: boolean | null
          mime_type?: string | null
          page_context?: string | null
          recipient_id?: string | null
          reply_to_id?: string | null
          role: string
          search_vector?: unknown
          video_url?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          delivery_status?: string | null
          edited_at?: string | null
          encrypted_content?: string | null
          file_size?: number | null
          id?: string
          image_url?: string | null
          is_encrypted?: boolean | null
          mime_type?: string | null
          page_context?: string | null
          recipient_id?: string | null
          reply_to_id?: string | null
          role?: string
          search_vector?: unknown
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          joined_at: string
          left_at: string | null
          role: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          joined_at?: string
          left_at?: string | null
          role?: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          joined_at?: string
          left_at?: string | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      mailing_list_signups: {
        Row: {
          country: string
          country_code: string
          created_at: string
          email: string
          first_name: string
          gender: string
          id: string
          last_name: string
          phone: string
        }
        Insert: {
          country: string
          country_code: string
          created_at?: string
          email: string
          first_name: string
          gender: string
          id?: string
          last_name: string
          phone: string
        }
        Update: {
          country?: string
          country_code?: string
          created_at?: string
          email?: string
          first_name?: string
          gender?: string
          id?: string
          last_name?: string
          phone?: string
        }
        Relationships: []
      }
      message_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_connections: {
        Row: {
          connection_method: string | null
          created_at: string
          expires_at: string | null
          id: string
          invitation_code: string
          recipient_id: string | null
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          connection_method?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          invitation_code: string
          recipient_id?: string | null
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          connection_method?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          invitation_code?: string
          recipient_id?: string | null
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          concierge: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          id: string
          name: string | null
          phone: string | null
          profile_picture: string | null
          region: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          concierge?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          id?: string
          name?: string | null
          phone?: string | null
          profile_picture?: string | null
          region?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          concierge?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
          profile_picture?: string | null
          region?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string
          endpoint: string
          id: string
          p256dh_key: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auth_key: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh_key: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auth_key?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh_key?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      typing_indicators: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          is_typing: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          is_typing?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          is_typing?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "typing_indicators_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      usa_launch_notifications: {
        Row: {
          created_at: string | null
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      user_encryption_keys: {
        Row: {
          created_at: string
          id: string
          private_key_encrypted: string
          public_key: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          private_key_encrypted: string
          public_key: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          private_key_encrypted?: string
          public_key?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vivian_chats: {
        Row: {
          created_at: string
          id: string
          messages: Json
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages: Json
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json
          session_id?: string
        }
        Relationships: []
      }
      warranty_registrations: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          order_number: string
          product_type: string
          purchase_date: string
          receipt_url: string
          registered_at: string
          registration_id: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          order_number: string
          product_type: string
          purchase_date: string
          receipt_url: string
          registered_at?: string
          registration_id: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          order_number?: string
          product_type?: string
          purchase_date?: string
          receipt_url?: string
          registered_at?: string
          registration_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_invitations: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

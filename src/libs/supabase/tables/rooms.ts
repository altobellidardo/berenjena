'use server'

import { createClient } from '../server'

const supabase = createClient()

export async function DbCreateRoom (adminId: string) {
  return await supabase
    .from('rooms')
    .insert({ admin_id: adminId })
    .select('id')
    .single()
}

export async function DbGetRoomByAdminId (adminId: string) {
  return await supabase
    .from('rooms')
    .select('*')
    .eq('admin_id', adminId)
    .single()
}

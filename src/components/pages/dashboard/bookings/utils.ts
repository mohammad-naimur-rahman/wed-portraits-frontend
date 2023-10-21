type Status = 'pending' | 'confirmed' | 'cancelled' | 'ongoing' | 'fulfilled'

export const getUpdateStatusArr = (status: Status) => {
  switch (status) {
    case 'pending':
      return ['pending', 'confirmed', 'cancelled']
    case 'confirmed':
      return ['confirmed', 'ongoing']
    case 'cancelled':
      return []
    case 'ongoing':
      return ['ongoing', 'fulfilled']
    case 'fulfilled':
      return []
  }
}

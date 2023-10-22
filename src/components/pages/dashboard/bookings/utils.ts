type Status = 'pending' | 'confirmed' | 'cancelled' | 'ongoing' | 'fulfilled'

export const getUpdateStatusArr = (status: Status) => {
  switch (status) {
    case 'pending':
      return ['pending', 'cancelled']
    case 'ongoing':
      return ['ongoing', 'fulfilled']
    case 'confirmed':
      return []
    case 'cancelled':
      return []
    case 'fulfilled':
      return []
  }
}

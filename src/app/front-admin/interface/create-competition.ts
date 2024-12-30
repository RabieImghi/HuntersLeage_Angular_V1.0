export interface CreateCompetition {
    code: string,
    location: string,
    date: string,
    speciesType: string,
    minParticipants: number,
    maxParticipants: number,
    openRegistration: boolean
}

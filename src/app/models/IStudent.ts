export interface OnTrackToGraduate {
    onTrackToGraduate?: any;
    interpretation?: any;
}

export interface Address {
    streetNumberName: string;
    city: string;
    state: string;
    postalCode: string;
}

export interface SuccessTeamMember {
    id: number;
    studentUsi: number;
    guid: string;
    uniqueId: string;
    personTypeId: number;
    personalTitlePrefix: string;
    firstName: string;
    middleName: string;
    lastSurname: string;
    name: string;
    sexType: string;
    imageUrl: string;
    relationToStudent: string;
    highestCompletedLevelOfEducation: string;
    yearsOfTeachingExperience?: number;
    highlyQualifiedTeacher: boolean;
    shortBiography?: any;
    languages?: any;
    credentials?: any;
    emergencyContactStatus: boolean;
    emails: string[];
    telephone: string[];
    addresses: Address[];
    gradeLevel: string;
    nameOfInstitution: string;
    chatEnabled: boolean;
    unreadMessageCount: number;
}

export interface AbsentAttendanceEvent {
    dateOfEvent: Date;
    eventCategory: string;
    eventDescription: string;
    reason: string;
}

export interface Attendance {
    dateAsOf: Date;
    excusedAttendanceEvents: any[];
    unexcusedAttendanceEvents: any[];
    tardyAttendanceEvents: any[];
    absentAttendanceEvents: AbsentAttendanceEvent[];
    absenceThresholdDays: number;
    yearToDateAbsenceCount: number;
    excusedInterpretation: string;
    unexcusedInterpretation: string;
    tardyInterpretation: string;
    absentInterpretation: string;
}

export interface DisciplineActionsTaken {
    disciplineActionIdentifier: string;
    description: string;
}

export interface DisciplineIncident {
    incidentIdentifier: string;
    incidentDate: Date;
    description: string;
    disciplineActionsTaken: DisciplineActionsTaken[];
}

export interface ExternalLink {
    title: string;
    url: string;
    linkText: string;
}

export interface Behavior {
    dateAsOf: Date;
    yearToDateDisciplineIncidentCount: number;
    disciplineIncidents: DisciplineIncident[];
    interpretation: string;
    externalLink: ExternalLink;
    missingAssignments: MissingAssignments;
}

export interface Gpa {
    gpa: number;
    interpretation: string;
    nationalAverageGPA: number;
}

export interface Cours {
    courseCode: string;
    courseTitle: string;
    schoolYearTaken: number;
    gradeLevelIndex: number;
    gradeLevelTaken: string;
    academicSubjectDescription: string;
    attemptResultTypeDescription: string;
    creditsEarned: number;
    finalNumericGradeEarned: number;
    finalLetterGradeEarned: string;
    sessionName: string;
}

export interface Transcript {
    schoolYearTaken: number;
    gradeLevelTaken: string;
    gradeLevelIndex: number;
    sessionName: string;
    courses: Cours[];
}

export interface GradesByGradingPeriod {
    gradeType: string;
    gradingPeriodType: string;
    numericGradeEarned: number;
    letterGradeEarned?: any;
    gradeInterpretation: string;
}

export interface GradesByExam {
    gradeType?: any;
    gradingPeriodType: string;
    numericGradeEarned?: any;
    letterGradeEarned?: any;
    gradeInterpretation?: any;
}

export interface GradesBySemester {
    gradeType?: any;
    gradingPeriodType: string;
    numericGradeEarned?: any;
    letterGradeEarned?: any;
    gradeInterpretation?: any;
}

export interface CurrentCours {
    courseTitle: string;
    localCourseCode: string;
    courseCode: string;
    interfacePeriodName: string;
    staffUniqueId: string;
    teacherUsi: number;
    personTypeId: number;
    teacherName: string;
    imageUrl: string;
    gradesByGradingPeriod: GradesByGradingPeriod[];
    gradesByExam: GradesByExam[];
    gradesBySemester: GradesBySemester[];
    gradesByFinal: any[];
}

export interface CurrentGradeAverage {
    gradeAverage: number;
    evaluation: string;
}

export interface ExternalLink2 {
    title: string;
    url: string;
    linkText: string;
}

export interface CourseGrades {
    gpa: Gpa;
    transcript: Transcript[];
    currentCourses: CurrentCours[];
    currentGradeAverage: CurrentGradeAverage;
    externalLink: ExternalLink2;
}

export interface Assignment {
    localCourseCode: string;
    localCourseTitle?: any;
    courseTitle: string;
    assignmentTitle: string;
    assignmentDescription?: any;
    dateAssigned: Date;
    daysLate: number;
}

export interface AssignmentSection {
    assignments: Assignment[];
    staffFirstName: string;
    staffMiddleName: string;
    staffLastSurName: string;
    staffUniqueId: string;
    personTypeId: number;
    staffFullname: string;
    courseTitle: string;
    localCourseTitle?: any;
}

export interface ExternalLink3 {
    title: string;
    url: string;
    linkText: string;
}

export interface MissingAssignments {
    missingAssignmentCount: number;
    assignmentSections: AssignmentSection[];
    interpretation: string;
    externalLink: ExternalLink3;
}

export interface Event {
    interfaceroomIdentificationCode: string;
    firstName: string;
    middleName: string;
    lastSurname: string;
    name: string;
    scheduleName: string;
    courseTitle: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    isToday: boolean;
    durationInMinutes: number;
}

export interface Day {
    date: Date;
    scheduleName: string;
    events: Event[];
}

export interface Schedule {
    days: Day[];
}

export interface SubSection {
    title: string;
    score: number;
    performanceLevelMet: string;
    gradeLevel: string;
    AdministrationDate: Date;
    Index: number;
}

export interface Assessment2 {
    identifier?: any;
    title: string;
    administrationDate: Date;
    shortDescription: string;
    maxRawScore: number;
    totalScore: number;
    subsectionCount: number;
    subSections: SubSection[];
    externalLink: string;
}

export interface Assessment {
    assessments: Assessment2[];
}

export interface StaarAssessmentHistory {
    staarAssessmentHistory: SubSection[];
}


export interface Student {
    studentUsi: number;
    studentUniqueId: string;
    firstName: string;
    middleName: string;
    lastSurname: string;
    name: string;
    email: string;
    telephone: string;
    races: string[];
    hispanicOrLatino: boolean;
    sexType: string;
    imageUrl: string;
    currentSchool: string;
    gradeLevel: string;
    unreadMessageCount: number;
    externalLinks: any[];
    onTrackToGraduate: OnTrackToGraduate;
    successTeamMembers: SuccessTeamMember[];
    programs: any[];
    indicators: any[];
    attendance: Attendance;
    behavior: Behavior;
    courseGrades: CourseGrades;
    missingAssignments: MissingAssignments;
    schedule: Schedule;
    assessment: Assessment;
    staarAssessmentHistory: StaarAssessmentHistory;
}

export interface StudentCurrentGradeAverage {
    gradeAverage: number;
    evaluation: string;
}

export interface StudentExternalLink {
    url: string;
    utlType: string;
}

export interface ParentStudentAlertLogModel {
        parentUniqueId: string;
        studentUniqueId: string;
        value: string;
        alertTypeName: string;
        sentDate: Date;
}

export interface StudentBriefModel {
        studentUsi: number;
         studentUniqueId?: string;
         firstName: string;
         middleName?: string;
         lastSurname?: string;
         name?: string;
         sexType?: string;
         imageUrl?: string;
         gradeLevel?: string;
         currentSchool?: string;

         yTDAbsences?: number;
         absenceThresholdDays?: number;
         excusedAbsences?: number;
         excusedInterpretation?: string;
         unexcusedAbsences?: number;
         unexcusedInterpretation?: string;
         tardyAbsences?: number;
         tardyInterpretation?: string;
         adaAbsences?: number;
         adaAbsentInterpretation?: string;

         yTDDisciplineIncidentCount?: number;
         yTDDisciplineInterpretation?: string;
         yTDGPA?: number;
         gPAInterpretation?: string;
         missingAssignments?: number;
         missingAssignmentsInterpretation?: string;
         courseAvg?: number;
         courseAverage?: StudentCurrentGradeAverage;
         externalLinks?: StudentExternalLink[];
         alerts?: ParentStudentAlertLogModel[];
         unreadMessageCount?: number;
}

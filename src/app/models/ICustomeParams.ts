export interface CustomeParams {
    IMPORTANT_READ: IMPORTANTREAD;
    attendance: Attendance;
    behavior: Behavior;
    courseGrades: CourseGrades;
    assignments: Assignments;
    graduationReadiness: GraduationReadiness;
    studentProfileExternalLinks: StudentProfileExternalLink[];
    descriptors: Descriptors;
    assessments: Assessment[];
    staarAssessmentHistory: StaarAssessmentHistory;
    feedbackExternalUrl: string;
    mostCommonLanguageCodes: string[];
    staarExternalLink: string;
    psatSATExternalLink: string;
    featureToggle: FeatureToggle[];
    mobileApplications: MobileApplication[];
}

export interface IMPORTANTREAD {
    info: string;
    NOTE: string;
}

export interface ThresholdRule {
    interpretation: string;
    operator: string;
    value: number;
}

export interface Excused {
    maxAbsencesCountThreshold: number;
    thresholdRules: ThresholdRule[];
}

export interface ThresholdRule2 {
    interpretation: string;
    operator: string;
    value: number;
}

export interface Unexcused {
    maxAbsencesCountThreshold: number;
    thresholdRules: ThresholdRule2[];
}

export interface ThresholdRule3 {
    interpretation: string;
    operator: string;
    value: number;
}

export interface Tardy {
    maxAbsencesCountThreshold: number;
    thresholdRules: ThresholdRule3[];
}

export interface ADA {
    maxAbsencesCountThreshold: number;
    excused: Excused;
    unexcused: Unexcused;
    tardy: Tardy;
}

export interface ThresholdRule4 {
    interpretation: string;
    operator: string;
    value: number;
}

export interface Excused2 {
    maxAbsencesCountThreshold: number;
    thresholdRules: ThresholdRule4[];
}

export interface ThresholdRule5 {
    interpretation: string;
    operator: string;
    value: number;
}

export interface Unexcused2 {
    maxAbsencesCountThreshold: number;
    thresholdRules: ThresholdRule5[];
}

export interface ThresholdRule6 {
    interpretation: string;
    operator: string;
    value: number;
}

export interface Tardy2 {
    maxAbsencesCountThreshold: number;
    thresholdRules: ThresholdRule6[];
}

export interface PeriodLevelAttendance {
    maxAbsencesCountThreshold: number;
    excused: Excused2;
    unexcused: Unexcused2;
    tardy: Tardy2;
}

export interface Attendance {
    ADA: ADA;
    periodLevelAttendance: PeriodLevelAttendance;
}

export interface LinkToSystemWithDetails {
    title: string;
    linkText: string;
    url: string;
}

export interface ThresholdRule7 {
    interpretation: string;
    operator: string;
    value: number;
}

export interface Behavior {
    maxDisciplineIncidentsCountThreshold: number;
    linkToSystemWithDetails: LinkToSystemWithDetails;
    thresholdRules: ThresholdRule7[];
}

export interface LinkToSystemWithDetails2 {
    title: string;
    linkText: string;
    url: string;
}

export interface ThresholdRule8 {
    interpretation: string;
    operator: string;
    value: number;
}

export interface Gpa {
    nationalAverage: number;
    thresholdRules: ThresholdRule8[];
}

export interface ThresholdRule9 {
    interpretation: string;
    operator: string;
    value: number;
}

export interface CourseAverage {
    thresholdRules: ThresholdRule9[];
}

export interface CourseGrades {
    linkToSystemWithDetails: LinkToSystemWithDetails2;
    gpa: Gpa;
    courseAverage: CourseAverage;
}

export interface LinkToSystemWithDetails3 {
    title: string;
    linkText: string;
    url: string;
}

export interface ThresholdRule10 {
    interpretation: string;
    operator: string;
    value: number;
}

export interface Assignments {
    maxAssigmentsCountThreshold: number;
    linkToSystemWithDetails: LinkToSystemWithDetails3;
    thresholdRules: ThresholdRule10[];
}

export interface ThresholdRule11 {
    interpretation: string;
    operator: string;
    value: boolean;
}

export interface GraduationReadiness {
    thresholdRules: ThresholdRule11[];
}

export interface StudentProfileExternalLink {
    title: string;
    linkText: string;
    url: string;
}

export interface Descriptors {
    excusedAbsenceDescriptorCodeValue: string;
    unexcusedAbsenceDescriptorCodeValue: string;
    tardyDescriptorCodeValue: string;
    absentDescriptorCodeValue: string;
    gradeBookMissingAssignmentTypeDescriptors: string[];
    gradeTypeGradingPeriodDescriptor: string;
    gradeTypeSemesterDescriptor: string;
    gradeTypeExamDescriptor: string;
    gradeTypeFinalDescriptor: string;
    validParentDescriptors: string[];
    validStaffPositionTitle: string[];
    schoolGradingPeriodDescriptors: string[];
    examGradingPeriods: string[];
    disciplineIncidentDescriptor: string;
    missingAssignmentLetterGrade: string;
    validEmailTypeDescriptors: string[];
}

export interface Assessment {
    title: string;
    assessmentIdentifiers: string[];
    assessmentReportingMethodTypeDescriptor: string;
    shortDescription: string;
    externalLink: string;
}

export interface StaarAssessmentHistory {
    title: string;
    assessmentIdentifiers: string[];
    assessmentReportingMethodTypeDescriptor: string;
    shortDescription: string;
    externalLink: string;
}

export interface Feature {
    name: string;
    enabled: string;
}

export interface FeatureToggle {
    page: string;
    route: string;
    features: Feature[];
}

export interface MobileApplication {
    name: string;
    version: string;
}





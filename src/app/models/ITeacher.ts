export interface Section {
    schoolId?: number;
    classPeriodName?: string;
    classroomIdentificationCode?: string;
    localCourseCode?: string;
    termDescriptorId?: number;
    schoolYear?: number;
    uniqueSectionCode?: string;
    sequenceOfCourse?: number;
    beginDate?: Date;
    endDate?: Date;
    sessionName?: string;
    courseTitle?: string;
}

export interface TeacherStudentsRequestModel {
    section: Section;
    studentName: string;
}


export interface FamilyCount {
     campusName:string;
     studentsCount:number;
    familyMembersCount:number;
}
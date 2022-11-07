export interface GradeModel {
    id: number;
    name: string;
}

export interface GradesLevelModel {
    grades: number[];
    skipRows?: number;
    pageSize?: number;
}

export interface ParentStudentTermFilterModel {
    searchTerm?: string;
    gradeLevels: GradesLevelModel;
    schoolId: number;
}
export interface ParentStudentTermProgramFilterModel {
    searchTerm?: string;
    gradeLevels: GradesLevelModel;
    schoolId: number;
    programs: number[];
}
export interface SchoolBriefDetailModel {
    schoolId: number;
    nameOfInstitution: string;
}


export const calculateGradePoints = (totalMarks:number)=>{
     const result = {
        grade:"NA",
        gradePoints:0
    }
    if(totalMarks>= 80){
        result.grade = "A"
        result.gradePoints = 4
    }else if(totalMarks >= 60 && totalMarks<=79){
        result.grade = "B"
        result.gradePoints = 3.5
    }
    else if(totalMarks >= 40 && totalMarks<=59){
        result.grade = "C"
        result.gradePoints = 3.0
    }
    else if(totalMarks >= 20 && totalMarks<=39){
        result.grade = "D"
        result.gradePoints = 2.5
    }
    else if(totalMarks >= 0 && totalMarks<=19){
        result.grade = "F"
        result.gradePoints = 0.0
    }
    return result
}
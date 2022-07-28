import { defineStore } from "pinia";

export interface Student {
  name: string;
  id: string;
  section: string
}
interface State {
  students: Student[] | [];
  selectedStudent: Student | null;
}


export const useMainStore = defineStore("mainstore", {
  // convert to a function
  state: (): State => ({
    students: [],
    selectedStudent: null
  }),

  actions: {
    /**
     * 
     * @param data 
     */
    updateStudent(data: Student) {
      this.students = this.students.map(item => {
        if (item.id === data.id) {
          return {
            ...item,
            name: data.name,
            section: data.section
          };
        } else {
          return item;
        }
      });

      //after updating remove selected student
      this.selectedStudent = null;
    },
    /**
     * 
     * @param id 
     */
    removeStudent(id: String) {
      this.students = this.students.filter(student => student.id !== id);
    },
    /**
     * 
     * @param student 
     */
    addStudent(student: { name: string, section: string }) {
      let obj = {};
      if (this.students.length == 0 ) {
             obj.name = student.name;
             obj.id = 1;
             obj.section = student.section;
      } else {
        obj.name = student.name;
        obj.id = this.students[this.students.length - 1].id + 1;
        obj.section = student.section;
      }
      this.students.push(obj)
      // this.students = [
      //   // {
      //   //   name: student.name,
      //   //   id: Math.random() * 100 + '',
      //   //   section: student.section
      //   // },
      //   obj,
      //   ...this.students
      // ];
    },
  },
});

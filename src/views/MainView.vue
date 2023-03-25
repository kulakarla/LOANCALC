<template>
  <div class="root">
    <div class="databox">
      <a href="/"><img src="../assets/loancalc_logo.png"></a>
      <div class="inputDiv">
        <input type="text" name="personalCode" v-model="personalCode" placeholder="Personal code"/>
        <p v-if="v$.personalCode.$error">{{ v$.personalCode.$errors[0].$message }}</p>
      </div>
      <div class="inputDiv">
        <input type="text" name="loanAmount" v-model="loanAmount" placeholder="Loan amount"/>
        <p v-if="v$.loanAmount.$error">{{ v$.loanAmount.$errors[0].$message }}</p>
      </div>
      <div class="inputDiv">
        <input type="text" name="loanDuration" v-model="loanDuration" placeholder="Loan duration"/>
        <p v-if="v$.loanDuration.$error"> {{ v$.loanDuration.$errors[0].$message }}</p>
      </div>
      <button @click="validLoan" :disabled="v$.$error ? true : false">SUBMIT</button>
    </div>
  </div>

</template>

<script>

import useVuelidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'
//import {reactive} from 'vue'

export default {
  name: 'MainView',

  data(){
    return{
      v$: useVuelidate(),
      personalCode: '',
      loanAmount: '',
      loanDuration: '',
    }
  },

  validations(){

    const validPersonalCode = (value) => /^[1-6][0-9]{8}(65|76|87|98)$/.test(value)

    const validAmount = (value) => Number(value) >= 2000 && Number(value <= 10000)

    const validDuration = (value) => /^[0-9]{2}$/.test(value) && Number(value) >= 12 && Number(value <= 60)

    return{
      personalCode: {
        required,
        validPersonalCode: helpers.withMessage("Invalid personal code", validPersonalCode),
      },
      loanAmount: {
        required,
        validAmount: helpers.withMessage("Loan must be between 2000 and 10000", validAmount),
      },
      loanDuration: {
        required,
        validDuration: helpers.withMessage("Loans are given for periods between 12 to 60 months", validDuration)
      }
    };
  },
  methods:{
    validLoan(){
      this.v$.$touch()

      if(!this.v$.$error){
      fetch(`http://localhost:3000/api/loans/${this.personalCode}/${this.loanAmount}/${this.loanDuration}`)
          .then( response => response.json())
          .then( data => {

            console.log(data);

            if(data.getsLoan){
              if(data.loanInitialPeriod){
                console.log("Initial loan period success")
                this.$router.push('/success/' + data.loanAmount + '/' + data.initialPeriod)
              }else{
                console.log("Non initial period success")
                this.$router.push('/success/' + data.loanAmount + '/' + data.minimumLoanHypotheticalPeriod + '/' + data.possibleInitialLoanPeriod)
              }
            }else{
              console.log("Loan rejected")
              this.$router.push('/failure')
            }

          })
          .catch( err => console.log(err.message))
      }
    }
  },
}
</script>

<style scoped>


.root{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.databox{
  border-radius:3px;
  border: 2px solid #2A0A55;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5%;
  margin: 0.5%;

}


.inputDiv{
  width: 300px;
  margin-bottom: 10px;
  margin-top: 10px;

}

.copyright{
  width: 400px;
}

p{
  word-wrap: break-word;
  margin-top: 3px;
  margin-bottom: 0;
  color: #C16E70;
  font-size: 10px;
}


input{
  border: none;
  outline: 0;
  border-bottom: 1px solid purple;
  width: 100%;
  font-size: 20px;
  color: #5B5B5D;
  font-family: Helvetica, serif;
  letter-spacing: -0.75px;
}


img{
  margin-top: 30px;
  margin-bottom: 30px;
}

button{
  width: 200px;
  height: 50px;
  border: 2px solid #2A0A55;
  background-color: #2A0A55;
  color: white;
  font-size: 25px;
  font-family: "Raleway";
  transition-duration: 0.4s;
  margin-top: 10px;
  border-radius: 2px;
  margin-bottom: 10px;
}
button:enabled:hover{
  background-color: white;
  color: #2A0A55;
  cursor: pointer;


}

button:disabled{
  opacity: 0.5;
  cursor: not-allowed;

}

::placeholder{
  opacity: 0.3;

}






</style>
<template>
  <div class="root">
    <div class="databox">
      <img src="../assets/loancalc_logo.png">
      <h1>Congratulations!</h1>
      <p>You are deemed fit for a loan up to {{ loanAmount }} for a payment period of {{ loanPeriod }} months.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InitialPeriodSuccess",

  data(){
    return{
      loanAmount: this.$route.params.loansum,
      loanPeriod: this.$route.params.period

    }

  }

}
</script>

<style scoped>

h1{
  color: #8CC7A1;
}

.root{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Helvetica, serif;
  letter-spacing: -0.5px;
}
.databox{
  border-radius:10px;
  border: 3px solid #2A0A55;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5%;
  margin: 0.5%;

}

p{
  text-align: center;
  margin-bottom: 30px;
}

img{
  margin-top: 30px;
  margin-bottom: 30px;
}

</style>
<template>
  <div class="root">
    <div class="databox">
      <a href="/"><img src="../assets/loancalc_logo.png"></a>
      <h1>Rejected</h1>
      <p>Unfortunately, your application does not fit our current requirements. We're sorry.</p>
    </div>
  </div>

</template>

<script>
export default {
  name: "LoanFail"
}
</script>

<style scoped>

h1{
  color: #DB324D;
  margin-top: 3px;
  margin-bottom: 3px;
}

.root{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Helvetica, serif;
  letter-spacing: -0.5px;
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

p{
  text-align: center;
  margin-bottom: 30px;
}

img{
  margin-top: 30px;
  margin-bottom: 30px;
}

</style>
<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { Field, Form, ErrorMessage, FieldArray } from 'vee-validate'
import TimezoneBlock from './TimezoneBlock.vue'
import MeetingBadge from './MeetingBadge.vue'
import dayjs from 'dayjs'
import * as yup from 'yup'
import type { MeetingForm } from './interfaces'


const props = defineProps<{
  hour: Date
}>()
const emits = defineEmits<{
  (e: 'meet-sent', meeting: MeetingForm): void
  (e: 'process-meet'): void
}>()
const { hour } = toRefs(props)
const limitUsers = 5
const description = ref<string>()
const initialData = {
  attendees: [
    {
      displayName: '',
      email: ''
    }
  ]
}
const schema = yup.object().shape({
  attendees: yup
    .array()
    .of(
      yup.object().shape({
        displayName: yup.string().required().label('Name'),
        email: yup.string().email().required().label('Email'),
      })
    )
    .strict(),
})


const submitForm = async ({ attendees }: any) => {
  emits('process-meet')
  const startTime = hour.value
  const endTime = dayjs(startTime).add(1, 'hour').toDate()
  const timeZone = 'America/New_York'
  const meeting: MeetingForm = {
    summary: `Meeting with ${attendees[0].displayName}`,
    description: description.value,
    startTime,
    endTime,
    timeZone,
    attendees
  }
  // emits('meet-sent', meeting)
  await fetch(`/google_calendar/add_event.json`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(meeting)
  })
    .then((response: any) => response.json())
    .then((response: any) => {
      console.log(response)
      emits('meet-sent', meeting)
    })
}
</script>

<template>
  <div class="meet-users">
    <h3>Meeting information</h3>
    <Form 
      @submit="submitForm"
      :initial-values="initialData"
      :validation-schema="schema"
      >
      <FieldArray name="attendees" v-slot="{ fields, push }">
        <div class="field-box" v-for="(field, index) in fields" :key="field.key">
          <div class="field">
            <Field 
              v-slot="{field, meta}"
              :id="`name_${index}`" 
              :name="`attendees[${index}].displayName`" 
              rules="required" 
              placeholder="Name"
              :validate-on-blur="true"
            >
              <input 
                v-bind="field"
                placeholder="Name"
                :class="{ error: !meta.valid && meta.validated }">
            </Field>
            <ErrorMessage :name="`attendees[${index}].displayName`">
              <p class="field-error" >Name is required</p>
            </ErrorMessage>
          </div>
          <div class="field">
            <Field 
              v-slot="{field, meta}"
              :id="`email_${index}`" 
              :name="`attendees[${index}].email`" 
              type="email" 
              placeholder="E-mail" 
              required="required|email" 
              :validate-on-blur="true">
              <input 
                v-bind="field"
                placeholder="E-mail"
                :class="{ error: !meta.valid && meta.validated }">
            </Field>
            <ErrorMessage :name="`attendees[${index}].email`">
              <p class="field-error" >E-mail is required</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="field-box" v-if="fields.length < limitUsers">
          <button type="button" class="field-box-button" @click="push({ displayName: '', email: '' })">Add Guests</button>
        </div>
      </FieldArray>
      <div class="field-box">
        <div class="field">
          <textarea v-model="description" name="message" placeholder="Please share anything that will help prepare for our meeting."></textarea>
        </div>
      </div>
      <div class="field-box">
        <button type="submit" class="field-box-button">Schedule Event</button>
      </div>
    </Form>
    <MeetingBadge :hour="props.hour" />
    <TimezoneBlock />
  </div>
</template>

<style lang="sass">
  .meet-users
    color: #fff
    margin-top: 40px
  .meet-users, .field-box, .field, .field input, .field textarea
    width: 100%
  .field-box
    margin: 0 0 30px
  .field
    position: relative
    input, textarea, input:focus, textarea:focus, input.error
      transition: all .1s ease-in-out
    input, textarea
      font-family: var(--inter)
      color: #fff
      background: #000
      border: none
      font-size: 18px
      border-bottom: 1px solid #fff
      outline: none
      &:focus
        border-bottom-width: 2px
    input
      padding: 0 10px
      height: 60px
      margin-bottom: 10px
      &.error
        border-bottom: 1px solid #eb3b5a
        color: #eb3b5a
    textarea
      resize: none
      padding: 5px 10px
      height: 150px
  .field-error
    margin: 0
    color: #eb3b5a
    font-size: 14px
  .field-box-button
    width: 297px
    cursor: pointer
    height: 67px
    border: none
    color: #fff
    font-size: 15px
    display: flex
    align-items: center
    justify-content: center
    background: linear-gradient(100.22deg, #FF7B31 5.14%, #6E49FF 92.58%)
    background-position: 100% 0
    background-size: 120% 100%
    border-radius: 17px
    transition: all .2s ease-in-out
    &:hover
      transition: all .2s ease-in-out
      background-position: 50% 0
  @media all and (max-width: 600px)
    .field-box-button
      width: 230px
      height: 50px
    .field
      textarea, input
        font-size: 16px
</style>
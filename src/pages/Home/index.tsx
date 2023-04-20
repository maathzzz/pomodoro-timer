import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { 
  HomeContainer,  
  StartCountdownButton, 
  StopCountdownButton
} from './styles'
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: 
    zod
      .number()
      .min(1, 'O ciclo precisa ser de no minímo 1 minuto')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 25,

    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    // reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task;


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />

        { activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="submit">
            <HandPalm size={24}/>
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
          </StartCountdownButton>
        ) }
      </form>
    </HomeContainer>
  )
}
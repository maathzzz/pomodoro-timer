import { useForm, useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()


    return (
        <FormContainer>
          <label htmlFor="task"> Vou estar </label>
          <TaskInput 
            id="task"
            list="taskSugestions" 
            placeholder='Nomeie sua tarefa...'
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="taskSugestions">
            <option value="trabalhando 💼" />
            <option value="estudando 📚" />
            <option value="almoçando 🌮" />
            <option value="programando 💻" />
            <option value="jogando xadrez ♟️" />
          </datalist>

          <label htmlFor="minutesAmount"> durante </label>
          <MinutesAmountInput 
            type="number" 
            placeholder='00' 
            id="minutesAmout" 
            min={1} 
            max={60}
            {...register('minutesAmount', { valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>
    )
}
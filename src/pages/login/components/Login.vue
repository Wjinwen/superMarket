<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    style="width: 300px;margin-top: -50px;"
  >
    <template v-if="type == 'password'">
      <t-form-item name="username">
        <t-input v-model="formData.username" size="large" :placeholder="`${t('pages.login.input.account')}：admin`">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          :placeholder="`${t('pages.login.input.password')}：admin`"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>
      <img src="@/assets/img/robot_login.png" alt="" class="login-robot" @click="onSubmit" />
    </template>
    
  </t-form>
</template>

<script setup lang="ts">
import type { FormInstanceFunctions, FormRule, SubmitContext } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useCounter } from '@/hooks';
import { t } from '@/locales';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const INITIAL_DATA = {
  username: 'admin',
  password: 'admin123',
};

const FORM_RULES: Record<string, FormRule[]> = {
  username: [{ required: true, message: t('pages.login.required.account'), type: 'error' }],
  password: [{ required: true, message: t('pages.login.required.password'), type: 'error' }],
};

const type = ref('password');

const form = ref<FormInstanceFunctions>();
const formData = ref({ ...INITIAL_DATA });
const showPsw = ref(false);

const [countDown, handleCounter] = useCounter();
const router = useRouter();
const route = useRoute();

const onSubmit =  () => {
  form.value.validate().then(async(e) => {
    console.log('==onSubmit=')
    if (e === true) {
      try {
      await userStore.login(formData.value);
      MessagePlugin.success('登录成功');
      const redirect = route.query.redirect as string;
      const redirectUrl = redirect ? decodeURIComponent(redirect) : '/home';
      router.push(redirectUrl);
    } catch (e) {
      console.log(e);
      MessagePlugin.error(e.message);
    }
    }
  });
};
</script>

<style lang="less" scoped>
.login-robot{
  position: absolute;
  bottom: 46px;
  left: 164px;
  cursor: pointer;
  height: 128px; 
}
</style>

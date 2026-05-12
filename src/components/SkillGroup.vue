<script setup>
defineProps({
  group: { type: Object, required: true }
})
</script>

<template>
  <section>
    <h2 class="skills-section-title">{{ group.title }}</h2>
    <ul class="skills-list">
      <li v-for="skill in group.skills" :key="skill.name" class="skill-item">
        <div class="skill-header">
          <span class="skill-name">{{ skill.name }}</span>
          <span class="skill-percentage">{{ skill.percent }}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" :style="{ width: skill.percent + '%' }"></div>
        </div>
      </li>
    </ul>
  </section>
</template>
